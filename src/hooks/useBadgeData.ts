import { ServerAPI } from 'decky-frontend-lib'
import { useEffect, useState } from 'react'

import SDHQDBTier from '../../types/SDHQDBTier'
import { getLinuxInfo, getProtonDBInfo } from '../actions/sdhqdb'
import { getCache, updateCache } from '../cache/sdhqDbCache'
import { isOutdated } from '../lib/time'

const useBadgeData = (serverAPI: ServerAPI, appId: string | undefined) => {
  const [sdhqDBTier, setsdhqDBTier] = useState<SDHQDBTier>()
  const [linuxSupport, setLinuxSupport] = useState<boolean>(false)

  async function refresh() {
    const tierPromise = getProtonDBInfo(serverAPI, appId as string).catch(
      () => 'pending' as const
    )
    const linuxPromise = getLinuxInfo(serverAPI, appId as string).catch(
      () => false
    )
    const [tier, linuxSupport] = await Promise.all([tierPromise, linuxPromise])
    if (tier?.length && appId?.length) {
      updateCache(appId, {
        tier: tier,
        linuxSupport,
        lastUpdated: new Date().toISOString()
      })
      setsdhqDBTier(tier)
    }
    setLinuxSupport(linuxSupport)
  }

  useEffect(() => {
    // Proton DB Data
    let ignore = false
    async function getData() {
      const cache = await getCache(appId as string)
      if (cache?.tier) {
        setsdhqDBTier(cache.tier)
        if (!isOutdated(cache?.lastUpdated)) return
      }
      const tier = await getProtonDBInfo(serverAPI, appId as string)
      if (ignore) {
        return
      }
      if (!tier?.length) return
      setsdhqDBTier(tier)
    }
    if (appId?.length) {
      getData()
    }
    return () => {
      ignore = true
    }
  }, [appId])

  useEffect(() => {
    // Linux Data
    let ignore = false
    async function getData() {
      const cache = await getCache(appId as string)
      if (typeof cache?.linuxSupport !== 'undefined') {
        setLinuxSupport(cache?.linuxSupport)
        if (!isOutdated(cache?.lastUpdated)) return
      }
      const linuxSupport = await getLinuxInfo(serverAPI, appId as string)
      if (ignore) {
        return
      }
      setLinuxSupport(linuxSupport)
    }

    if (appId?.length) {
      getData()
    }
    return () => {
      ignore = true
    }
  }, [appId])

  useEffect(() => {
    if (sdhqDBTier) {
      updateCache(appId as string, {
        tier: sdhqDBTier,
        linuxSupport,
        lastUpdated: new Date().toISOString()
      })
    }
  }, [sdhqDBTier, linuxSupport])

  return {
    sdhqDBTier,
    linuxSupport,
    refresh
  }
}

export default useBadgeData
