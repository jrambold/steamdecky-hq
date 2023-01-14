import localforage from 'localforage'
import SDHQDBTier from '../../types/SDHQDBTier'

const STORAGE_KEY = 'sdhqdb-ind-cache'

localforage.config({
  name: STORAGE_KEY
})

type SDHQDBCache = {
  tier: SDHQDBTier
  lastUpdated: string
}

export async function updateCache(appId: string, newData: SDHQDBCache) {
  const oldCache = await localforage.getItem<SDHQDBCache>(appId)
  const newCache: SDHQDBCache = { ...oldCache, ...newData }
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

export async function getCache(appId: string): Promise<SDHQDBCache | null> {
  const data = await localforage.getItem<SDHQDBCache>(appId)
  return data
}
