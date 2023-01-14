import { ServerAPI } from 'decky-frontend-lib'
import { useEffect, useState } from 'react'

import SDHQDBTier from '../../types/SDHQDBTier'
import { getSDHQInfo, getSDHQTier } from '../actions/sdhqdb'
import { getCache, updateCache } from '../cache/sdhqDbCache'
import { isOutdated } from '../lib/time'

const useBadgeData = (serverAPI: ServerAPI, appId: string | undefined) => {
  const [sdhqDBTier, setsdhqDBTier] = useState<SDHQDBTier>()

  async function refresh() {
    const tierPromise = getSDHQTier(serverAPI, appId as string).catch(
      () => 'pending' as const
    )
    const [tier] = await Promise.all([tierPromise])
    if (tier?.length && appId?.length) {
      updateCache(appId, {
        tier: tier,
        lastUpdated: new Date().toISOString()
      })
      setsdhqDBTier(tier)
    }
  }

  useEffect(() => {
    // SDHQ DB Data
    let ignore = false
    async function getData() {
      const cache = await getCache(appId as string)
      if (cache?.tier) {
        setsdhqDBTier(cache.tier)
        if (!isOutdated(cache?.lastUpdated)) return
      }
      const tier = await getSDHQTier(serverAPI, appId as string)
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
    if (sdhqDBTier) {
      updateCache(appId as string, {
        tier: sdhqDBTier,
        lastUpdated: new Date().toISOString()
      })
    }
  }, [sdhqDBTier])

  return {
    sdhqDBTier,
    refresh
  }
}

export default useBadgeData
