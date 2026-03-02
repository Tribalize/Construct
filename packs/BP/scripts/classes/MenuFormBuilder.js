import { ActionFormData, ModalFormData } from '@minecraft/server-ui';
import { structureCollection } from './Structure/StructureCollection';

export class MenuFormBuilder {
    static menuTitle = { translate: 'construct.mainmenu.title' };

    static buildAllInstanceName() {
        const allInstanceNameForm = new ActionFormData()
            .title(this.menuTitle)
            .body({ translate: 'construct.mainmenu.selectinstance' });
        allInstanceNameForm.button({ translate: 'construct.mainmenu.settings' });
        structureCollection.getInstanceNames().forEach(instanceName => {
            allInstanceNameForm.button(`${structureCollection.get(instanceName).isEnabled() ? '§2' : '§c'}${instanceName}`);
        });
        allInstanceNameForm.button({ translate: 'construct.mainmenu.newinstance' });
        allInstanceNameForm.button({ translate: 'construct.mainmenu.howto' });
        return allInstanceNameForm;
    }

    static buildNewInstance() {
        return new ModalFormData()
            .title(this.menuTitle)
            .textField({ translate: 'construct.mainmenu.newinstance.prompt' }, { translate: 'construct.mainmenu.newinstance.placeholder' })
            .submitButton({ translate: 'construct.menu.submit' });
    }

    static buildAllStructures() {
        const allStructuresForm = new ActionFormData()
            .title(this.menuTitle)
            .body({ translate: 'construct.mainmenu.selectstructure.header' });
        structureCollection.getWorldStructureIds().forEach(structureId => {
            const structureName = structureId.replace('mystructure:', '');
            allStructuresForm.button(`§2${structureName}`);
        });
        allStructuresForm.button({ translate: 'construct.mainmenu.selectstructure.other' });
        //allStructuresForm.button({ translate: 'construct.mainmenu.selectstructure.howto' }); useless
        //here is a same button at buildAllInstanceName() already
        //It work as the button construct.mainmenu.selectstructure.other

        //here is no locationkey named construct.mainmenu.selectstructure.howto but there's a key named construct.mainmenu.howto
        
        return allStructuresForm;
    }

    static buildOtherStructure() {
        return new ModalFormData()
            .title(this.menuTitle)
            .textField({ translate: 'construct.mainmenu.selectstructure.other.prompt' }, { translate: 'construct.mainmenu.selectstructure.other.placeholder' })
            .submitButton({ translate: 'construct.menu.submit' });
    }

    static buildHowTo() {
        const message = { rawtext: [
            { translate: 'construct.mainmenu.howto.add.header' }, { text: '\n' },
            { translate: 'construct.mainmenu.howto.add.structureblock' }, { text: '\n' },
            { translate: 'construct.mainmenu.howto.add.or' }, { text: '\n' },
            { translate: 'construct.mainmenu.howto.add.mcstructure' }, { text: '\n' },
            { text: '\n' }, { translate: 'construct.mainmenu.howto.remove.header' }, { text: '\n' },
            { translate: 'construct.mainmenu.howto.remove.body' }, { text: '\n' },
        ] };
        return new ActionFormData()
            .title(this.menuTitle)
            .body(message);
    }
}
