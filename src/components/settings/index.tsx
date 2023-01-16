import {
  ButtonItem,
  ButtonItemProps,
  DropdownItem,
  PanelSection,
  PanelSectionProps,
  PanelSectionRow,
  ToggleField
} from 'decky-frontend-lib'
import { FC, ReactNode } from 'react'
import { clearCache } from '../../cache/sdhqDbCache'
import { useSettings } from '../../context/settingsContext'

type ExtendedPanelSectionProps = PanelSectionProps & {
  children: ReactNode
}

const DeckPanelSection = PanelSection as FC<ExtendedPanelSectionProps>

type PanelSectionRowProps = {
  children: ReactNode
}

const DeckPanelSectionRow = PanelSectionRow as FC<PanelSectionRowProps>

type ExtendedButtonItemProps = ButtonItemProps & {
  children: ReactNode
}

const DeckButtonItem = ButtonItem as FC<ExtendedButtonItemProps>

const sizeOptions = [
  { data: 0, label: 'Regular', value: 'regular' },
  { data: 1, label: 'Small', value: 'small' },
  { data: 2, label: 'Minimalist', value: 'minimalist' }
] as const

const positionOptions = [
  { data: 0, label: 'Top Left', value: 'tl' },
  { data: 1, label: 'Top Right', value: 'tr' }
] as const

export default function Index() {
  const { state: settingsState, dispatch: settingsDispatch } = useSettings()
  return (
    <div>
      <DeckPanelSection title="Settings">
        <DeckPanelSectionRow>
          <DropdownItem
            label="Badge Size"
            description="Choose a different size for the badge"
            menuLabel="Badge Size"
            rgOptions={sizeOptions.map((o) => ({
              data: o.data,
              label: o.label
            }))}
            selectedOption={
              sizeOptions.find((o) => o.value === settingsState.size)?.data || 0
            }
            onChange={(newVal: { data: number; label: string }) => {
              const newSize =
                sizeOptions.find((o) => o.data === newVal.data)?.value ||
                'regular'
              settingsDispatch({
                type: 'set-size',
                value: newSize
              })
            }}
          />
        </DeckPanelSectionRow>
        {settingsState.size === 'minimalist' ? (
          <DeckPanelSectionRow>
            <ToggleField
              label="Expand Label on hover"
              description="Minimalist Only. Display badge text on focus"
              checked={settingsState.labelOnHover}
              onChange={(newVal: boolean) => {
                settingsDispatch({
                  type: 'set-label-on-hover',
                  value: newVal
                })
              }}
            />
          </DeckPanelSectionRow>
        ) : (
          ''
        )}
        <DeckPanelSectionRow>
          <DropdownItem
            label="Badge Position"
            description="Positon the badge within the the game page header"
            menuLabel="Badge Position"
            rgOptions={positionOptions.map((o) => ({
              data: o.data,
              label: o.label
            }))}
            selectedOption={
              positionOptions.find((o) => o.value === settingsState.position)
                ?.data || 0
            }
            onChange={(newVal: { data: number; label: string }) => {
              const newPosition =
                positionOptions.find((o) => o.data === newVal.data)?.value ||
                'tl'
              settingsDispatch({
                type: 'set-position',
                value: newPosition
              })
            }}
          />
        </DeckPanelSectionRow>
      </DeckPanelSection>
      <DeckPanelSection title="Caching">
        <DeckPanelSectionRow>
          <DeckButtonItem
            label="Clear the cache to force refresh all SDHQ indicators"
            bottomSeparator="none"
            layout="below"
            onClick={() => clearCache()}
          >
            Clear SDHQ Cache
          </DeckButtonItem>
        </DeckPanelSectionRow>
      </DeckPanelSection>
    </div>
  )
}
