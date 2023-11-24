import { kv } from "@vercel/kv"

import {
  getSessionId,
  getSessionIdAndCreateIfMissing,
} from "~/lib/session/session-id-actions"

export function get(key: string, namespace: string = "") {
  const sessionId = getSessionId()
  if (!sessionId) {
    return null
  }
  return kv.hget(`session-${namespace}-${sessionId}`, key)
}

export function getAll(namespace: string = "") {
  const sessionId = getSessionId()
  if (!sessionId) {
    return null
  }
  return kv.hgetall(`session-${namespace}-${sessionId}`)
}

export function set(key: string, value: string, namespace: string = "") {
  const sessionId = getSessionIdAndCreateIfMissing()
  return kv.hset(`session-${namespace}-${sessionId}`, { [key]: value })
}
