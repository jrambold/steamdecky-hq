import { ServerAPI } from 'decky-frontend-lib'
import SDHQDBTier from '../../types/SDHQDBTier'

export async function getSDHQTier(
  serverAPI: ServerAPI,
  appId: string
): Promise<SDHQDBTier | undefined> {
  const req = {
    method: 'GET',
    url: `https://steamdeckhq.com/wp-json/wp/v2/game-reviews/?meta_key=steam_app_id&meta_value=${appId}`
  }
  const res = await serverAPI.callServerMethod<
    { method: string; url: string },
    { body: string; status: number }
  >('http_request', req)
  if (res.success && res.result.status === 200) {
    return JSON.parse(res.result?.body)[0].acf.sdhq_rating.toString()
  }
  return undefined
}

export async function getSDHQSlug(
  serverAPI: ServerAPI,
  appId: string
): Promise<SDHQDBTier | undefined> {
  const req = {
    method: 'GET',
    url: `https://steamdeckhq.com/wp-json/wp/v2/game-reviews/?meta_key=steam_app_id&meta_value=${appId}`
  }
  const res = await serverAPI.callServerMethod<
    { method: string; url: string },
    { body: string; status: number }
  >('http_request', req)
  if (res.success && res.result.status === 200) {
    return JSON.parse(res.result?.body)[0].guid.slug
  }
  return undefined
}


export async function getSDHQInfo(
  serverAPI: ServerAPI,
  appId: string
): Promise<object | undefined> {
  const req = {
    method: 'GET',
    url: `https://steamdeckhq.com/wp-json/wp/v2/game-reviews/?meta_key=steam_app_id&meta_value=${appId}`
  }
  const res = await serverAPI.callServerMethod<
    { method: string; url: string },
    { body: string; status: number }
  >('http_request', req)
  if (res.success && res.result.status === 200) {
    return JSON.parse(res.result?.body)[0]
  }
  return undefined
}
