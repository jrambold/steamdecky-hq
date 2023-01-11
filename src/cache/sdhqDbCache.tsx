import localforage from 'localforage'
import SDHQDBTier from '../../types/SDHQDBTier'

const STORAGE_KEY = 'sdhqdb-badges-cache'

localforage.config({
  name: STORAGE_KEY
})

type sdhqDBCache = {
  tier: SDHQDBTier
  linuxSupport: boolean
  lastUpdated: string
}

export async function updateCache(appId: string, newData: sdhqDBCache) {
  const oldCache = await localforage.getItem<sdhqDBCache>(appId)
  const newCache: sdhqDBCache = { ...oldCache, ...newData }
  await localforage.setItem(appId, newCache)
  return newCache
}

export function clearCache(appId?: string) {
  if (appId?.length) {
    localforage.removeItem(appId)
  } else {
    localStorage.removeItem(STORAGE_KEY)
    localforage.clear()
  }
}

export async function getCache(appId: string): Promise<sdhqDBCache | null> {
  const data = await localforage.getItem<sdhqDBCache>(appId)
  return data
}
