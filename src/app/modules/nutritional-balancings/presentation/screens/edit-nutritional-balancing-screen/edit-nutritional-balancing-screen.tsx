import { Form, Loading, Tabs } from '@/core/presentation/components/ui'

import { EditNutritionalBalancingHeader } from '../../components/edit-nutritional-balancing-header'
import { NutritionalBalancingAnimalNavigation } from '../../components/nutritional-balancing-animal-navigation'

import { useEditNutritionalBalancingScreen } from './hooks/edit-nutritional-balancing-screen.hook'

export function EditNutritionalBalancingScreen() {
  const {
    form,
    tabs,
    tab,
    activeTab,
    setActiveTab,
    currentNutritionalBalancing,
    isLoadingNutritionalBalancing,
    handleUpdateNutritionalBalancing,
    handleInvalidSubmit,
  } = useEditNutritionalBalancingScreen()

  if (isLoadingNutritionalBalancing) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loading className="size-10" />
      </div>
    )
  }

  if (!currentNutritionalBalancing) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">
          Balanceamento nutricional não encontrado
        </p>
      </div>
    )
  }

  return (
    <Form.Provider {...form}>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={form.handleSubmitWithCustomError(
          handleUpdateNutritionalBalancing,
          handleInvalidSubmit
        )}
      >
        <EditNutritionalBalancingHeader
          buttonDisabled={form.buttonDisabled}
          animalName={currentNutritionalBalancing.animal.name}
        />

        <div className="space-y-4">
          <NutritionalBalancingAnimalNavigation
            animalName={currentNutritionalBalancing.animal.name}
            currentNutritionalBalancingIndex={0}
            totalNutritionalBalancings={1}
            handleSelectNutritionalBalancing={() => null}
            handleRemoveNutritionalBalancing={() => null}
            hideRemoveButton
          />

          <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
            <Tabs.List className="w-full space-x-1">
              {tabs.map((tab) => (
                <Tabs.Trigger key={tab.key} value={tab.key} className="w-full">
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
      </form>
    </Form.Provider>
  )
}
