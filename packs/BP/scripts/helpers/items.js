import { EntityComponentTypes, ItemStack } from "@minecraft/server";

export function giveItemToPlayer(player, itemTypeId) {
    const inventory = player.getComponent(EntityComponentTypes.Inventory)?.container;
    if (!inventory)
        return false;
    const remainingItemStack = inventory.addItem(new ItemStack(itemTypeId));
    if (remainingItemStack)
        player.dimension.spawnItem(remainingItemStack, player.location);
    return true;
}
