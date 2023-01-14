import { Router, ServerAPI } from 'decky-frontend-lib'
import { ReactElement, FC, CSSProperties, ReactNode } from 'react'
import { FaReact } from 'react-icons/fa'
import { IoLogoTux } from 'react-icons/io'

import { useSettings } from '../../context/settingsContext'

import useAppId from '../../hooks/useAppId'
import useBadgeData from '../../hooks/useBadgeData'
import { getSDHQSlug } from '../../actions/sdhqdb'

import { Button, ButtonProps } from '../button'

import style from './style'

type ExtendedButtonProps = ButtonProps & {
  children: ReactNode
  type: 'button'
  style: CSSProperties
  className: string
}

const DeckButton = Button as FC<ExtendedButtonProps>

const positonSettings = {
  tl: { top: '40px', left: '20px' },
  tr: { top: '60px', right: '20px' },
  bl: { bottom: '40px', left: '20px' },
  br: { bottom: '40px', right: '20px' }
}

export default function SDInd({
  serverAPI,
  className
}: {
  serverAPI: ServerAPI
  className: string
}): ReactElement {
  const appId = useAppId(serverAPI)
  const appSlug = getSDHQSlug(serverAPI, appId as string)
  const { sdhqDBTier, refresh } = useBadgeData(serverAPI, appId)

  const { state } = useSettings()

  if (!sdhqDBTier) return <></>

  const tierClass = `protondb-decky-indicator-${sdhqDBTier}` as const
  const sizeClass = `protondb-decky-indicator-${
    state.size || 'regular'
  }` as const

  const labelOnHoverClass = state.labelOnHover
    ? 'protondb-decky-indicator-label-on-hover'
    : ''

  return (
    <>
      {style}
      <DeckButton
        className={`${className} ${tierClass} ${sizeClass} ${labelOnHoverClass}`}
        type="button"
        onClick={async () => {
          refresh()
          Router.NavigateToExternalWeb(`https://steamdeckhq.com/game-reviews/${appSlug}/`)
        }}
        style={{
          ...positonSettings[state.position]
        }}
      >
        <div>
          {/* The ProtonDB logo has a distracting background, so React's logo is being used as a close substitute */}
          <FaReact size={state.size !== 'regular' ? 20 : 28} />
        </div>
        <span>
          {state.size !== 'regular'
            ? sdhqDBTier?.toUpperCase().slice(0, 4)
            : sdhqDBTier?.toUpperCase()}
        </span>
      </DeckButton>
    </>
  )
}
