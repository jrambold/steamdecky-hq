import { ServerAPI } from 'decky-frontend-lib'
import SDHQDBTier from '../../types/SDHQDBTier'

export async function getProtonDBInfo(
  serverAPI: ServerAPI,
  appId: string
): Promise<SDHQDBTier | undefined> {
  const req = {
    method: 'GET',
    url: `https://www.protondb.com/api/v1/reports/summaries/${appId}.json`
  }
  const res = await serverAPI.callServerMethod<
    { method: string; url: string },
    { body: string; status: number }
  >('http_request', req)
  if (res.success && res.result.status === 200) {
    return JSON.parse(res.result?.body).tier
  }
  return undefined
}

export async function getLinuxInfo(
  serverAPI: ServerAPI,
  appId: string
): Promise<boolean> {
  const req = {
    method: 'GET',
    url: `https://www.protondb.com/proxy/steam/api/appdetails/?appids=${appId}`
  }
  const res = await serverAPI.callServerMethod<
    { method: string; url: string },
    { body: string; status: number }
  >('http_request', req)
  if (res.success && res.result.status === 200) {
    return Boolean(
      JSON.parse(res.result?.body)?.[appId as string]?.data?.platforms?.linux
    )
  } else {
    return false
  }
}
