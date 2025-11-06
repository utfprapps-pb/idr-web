import { Form, Loading, Tabs } from '@/core/presentation/components/ui'

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
    isLoadingAnimals,
    allAnimals,
    handleSelectNutritionalBalancing,

    handleCreateNutritionalBalancing,
  } = useNewNutritionalBalancingScreen()

  if (isLoadingAnimals) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loading className="size-10" />
      </div>
    )
  }

  if (!allAnimals.length) {
    return (
      <WithoutNutritionalBalancing message="Nenhum animal encontrado para criar um balanceamento nutricional." />
    )
  }

  if (!currentNutritionalBalancing) {
    return (
      <WithoutNutritionalBalancing message="Nenhum balanceamento nutricional selecionado." />
    )
  }

  return (
    <Form.Provider {...form}>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={form.handleSubmit(handleCreateNutritionalBalancing)}
      >
        <NewNutritionalBalancingHeader
          buttonDisabled={form.buttonDisabled}
          nutritionalBalancings={nutritionalBalancings}
        />

        <div className="space-y-4">
          <NutritionalBalancingAnimalNavigation
            animalName={currentNutritionalBalancing.animal.name}
            currentNutritionalBalancingIndex={currentNutritionalBalancingIndex}
            totalNutritionalBalancings={nutritionalBalancings.length}
            handleSelectNutritionalBalancing={handleSelectNutritionalBalancing}
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
