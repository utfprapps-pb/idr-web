import { Form, Tabs } from '@/core/presentation/components/ui'

import { NewNutritionalBalancingHeader } from '../../components/new-nutritional-balancing-header'
import { NutritionalBalancingAnimalNavigation } from '../../components/nutritional-balancing-animal-navigation'
import { WithoutNutritionalBalancing } from '../../components/without-nutritional-balancing'

import { useNewNutritionalBalancingScreen } from './hooks/new-nutritional-balancing-screen.hook'

export function NewNutritionalBalancingScreen() {
  const {
    form,
    tabs,
    tab,
    activeTab,
    setActiveTab,
    currentNutritionalBalancing,
    currentNutritionalBalancingIndex,
    nutritionalBalancings,
    handleSelectNutritionalBalancing,
    handleAppendNutritionalBalancing,
    handleRemoveNutritionalBalancing,
    handleCreateNutritionalBalancing,
    handleInvalidSubmit,
  } = useNewNutritionalBalancingScreen()

  return (
    <Form.Provider {...form}>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={form.handleSubmitWithCustomError(
          handleCreateNutritionalBalancing,
          handleInvalidSubmit
        )}
      >
        <NewNutritionalBalancingHeader
          buttonDisabled={form.buttonDisabled}
          nutritionalBalancings={nutritionalBalancings}
          handleAppendNutritionalBalancing={handleAppendNutritionalBalancing}
        />

        {!currentNutritionalBalancing ||
        currentNutritionalBalancingIndex === null ? (
          <WithoutNutritionalBalancing />
        ) : (
          <div className="space-y-4">
            <NutritionalBalancingAnimalNavigation
              animalName={currentNutritionalBalancing.animal.name}
              currentNutritionalBalancingIndex={
                currentNutritionalBalancingIndex
              }
              totalNutritionalBalancings={nutritionalBalancings.length}
              handleSelectNutritionalBalancing={
                handleSelectNutritionalBalancing
              }
              handleRemoveNutritionalBalancing={
                handleRemoveNutritionalBalancing
              }
            />

            <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
              <Tabs.List className="w-full space-x-1">
                {tabs.map((tab) => (
                  <Tabs.Trigger
                    key={tab.key}
                    value={tab.key}
                    className="w-full"
                  >
                    {tab.name}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>

              {tab && (
                <Tabs.Content value={activeTab} className="mt-4">
                  {tab.component}
                </Tabs.Content>
              )}
            </Tabs.Root>
          </div>
        )}
      </form>
    </Form.Provider>
  )
}
