export class BuilderOptions {
    static options = {};

    static add(builderOption) {
        BuilderOptions.options[builderOption.identifier] = builderOption;
    }

    static get(optionId) {
        return BuilderOptions.options[optionId];
    }

    static getOptionIds() {
        return Object.keys(BuilderOptions.options).sort((a, b) => a.localeCompare(b));
    }

    static isEnabled(optionId, playerId) {
        return BuilderOptions.options[optionId].isEnabled(playerId);
    }

    static setValue(optionId, playerId, value) {
        return BuilderOptions.options[optionId].setValue(playerId, value);
    }
}
