const MAX_HEALTH = 1000
const DEATH_HEALTH = 0

const INITIAL_LEVEL = 1

function create_character() {
    return {
        health: MAX_HEALTH,
        level: INITIAL_LEVEL,
        factions: [], 
    }
}

function is_alive(character) {
    return character.health > DEATH_HEALTH
}

function damage_character(character, damage) {
    character.health = character.health - damage

    if ( character.health <= DEATH_HEALTH) {
        character.health = DEATH_HEALTH
    }
}

function heal_character(character, health) {
    if (is_alive(character)) {
        character.health = character.health + health
    }

    if ( character.health > MAX_HEALTH) {
        character.health = MAX_HEALTH
    }
}

function isAllied(character_a, character_b) {
    return character_a.factions.some(faction => character_b.factions.includes(faction))
}

function should_damage_character(attacker, target) {
    return attacker !== target && !isAllied(target, attacker)
}

function attach_to_character(attacker, target, damage) {
    damage = calculate_damage(target, attacker, damage)
    if (should_damage_character(attacker, target)) {
        damage_character(target, damage)
    }
}

function calculate_damage(target, attacker, damage) {
    if (should_decrease_damage(target, attacker)) {
        damage = damage * 0.5
    }

    if (should_increase_damage(attacker, target)) {
        damage = damage * 1.5
    }
    return damage
}

function should_increase_damage(attacker, target) {
    return (attacker.level - target.level) >= 5
}

function should_decrease_damage(target, attacker) {
    return (target.level - attacker.level) >= 5
}

function heal_to_character(attacker, target, health) {
    if (attacker === target || isAllied(attacker, target)) {
        heal_character(target, health)
    }
}

function join_to_faction(character, faction) {
    character.factions.push(faction)
}

function leave_a_faction(character, faction) {

    const index = character.factions.indexOf(faction);
    if (index > -1) {
        character.factions.splice(index, 1); // 2nd parameter means remove one item only
    }
}

module.exports = { 
    create_character,
    damage_character,
    heal_character,
    is_alive,
    attach_to_character,
    heal_to_character,
    join_to_faction,
    leave_a_faction
}
