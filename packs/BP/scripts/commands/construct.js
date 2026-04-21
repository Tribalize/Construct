import { world, system, CommandPermissionLevel, CustomCommandStatus, Player } from '@minecraft/server';
import { MenuForm } from '../classes/MenuForm';
import { structureCollection } from '../classes/Structure/StructureCollection'
import { Builders } from '../classes/Builder/Builders';
import { giveItemToPlayer } from '../helpers/items';

export const MENU_ITEM = 'construct:menu';
const STRUCTURE_BLOCK_ITEM = 'minecraft:structure_block';

system.beforeEvents.startup.subscribe((event) => {
    const command = {
        name: 'construct:construct',
        description: 'construct.commands.construct',
        permissionLevel: CommandPermissionLevel.Any,
        cheatsRequired: false
    };
    const structureBlockCommand = {
        name: 'construct:structureblock',
        description: 'construct.commands.structureblock',
        permissionLevel: CommandPermissionLevel.Any,
        cheatsRequired: false
    };
    event.customCommandRegistry.registerCommand(command, givePlayerConstructItem);
    event.customCommandRegistry.registerCommand(structureBlockCommand, givePlayerStructureBlock);
});

function givePlayerConstructItem(origin) {
    const player = getPlayerFromCommand(origin);
    if (!player)
        return { status: CustomCommandStatus.Failure, message: 'construct.commands.construct.denyorigin' };
    system.run(() => {
        if (!giveItemToPlayer(player, MENU_ITEM))
            player.sendMessage({ translate: 'construct.commands.construct.fail' });
        else player.sendMessage({ translate: 'construct.commands.construct.success' });
    });
    return { status: CustomCommandStatus.Success };
}

function givePlayerStructureBlock(origin) {
    const player = getPlayerFromCommand(origin);
    if (!player)
        return { status: CustomCommandStatus.Failure, message: 'construct.commands.construct.denyorigin' };
    system.run(() => {
        if (!giveItemToPlayer(player, STRUCTURE_BLOCK_ITEM))
            player.sendMessage({ translate: 'construct.commands.structureblock.fail' });
        else player.sendMessage({ translate: 'construct.commands.structureblock.success' });
    });
    return { status: CustomCommandStatus.Success };
}

function getPlayerFromCommand(origin) {
    const player = origin.sourceEntity;
    if (player instanceof Player === false)
        return void 0;
    return player;
}

world.beforeEvents.itemUse.subscribe((event) => {
    if (!event.source || event.itemStack?.typeId !== MENU_ITEM) return;
    event.cancel = true;
    const builder = Builders.get(event.source.id);
    system.run(() => {
        if (builder.isFlexibleInstanceMoving())
            return;
        openMenu(event.source, event);
    });
});

function openMenu(player, event = void 0) {
    const options = { jumpToInstance: true }
    if (event) {
        const instanceNames = structureCollection.getInstanceNames();
        const instanceName = event.itemStack?.nameTag;
        if (instanceNames.includes(instanceName))
            options.instanceName = instanceName;
    }
    new MenuForm(player, options);
}
