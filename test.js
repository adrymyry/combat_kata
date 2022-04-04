const { 
    create_character,
    damage_character,
    heal_character,
    is_alive,
    attach_to_character,
    heal_to_character,
    join_to_faction,
    leave_a_faction
 }  = require('./index.js');

test('when a character is created, health is 1000 and level 1 and alive', () => {
    character = create_character()

    expect(character.health).toBe(1000);
    expect(character.level).toBe(1);
    expect(is_alive(character)).toBe(true);
});

test('when a character is damaged, the damage is substracted from health', () => {
    
    character = create_character()
    damage = 20
    damage_character(character, damage)

    expect(character.health).toBe(980)
    expect(is_alive(character)).toBe(true)
});

test('when damage exceeds current health, health becomes 0 and character dies', () => {
    character = create_character()
    damage = 2000
    damage_character(character, damage)

    expect(character.health).toBe(0)
    expect(is_alive(character)).toBe(false)
})

test('when health becomes 0 character dies', () => {
    character = create_character()
    damage = 1000
    damage_character(character, damage)

    expect(character.health).toBe(0)
    expect(is_alive(character)).toBe(false)
})

test('when a character is healed, the heal is added from health', () => {
    character = create_character()
    character.health = 800

    heal = 80
    
    heal_character(character, heal)

    expect(character.health).toBe(880)
})

test('dead characters cannot be healed', () => {
    character = create_character()
    character.health = 0
    health = 1000

    heal_character(character, health)

    expect(is_alive(character)).toBe(false)
    expect(character.health).toBe(0)
})

test('healing cannot raise health above 1000', () => {
    character = create_character()
    health = 1000

    heal_character(character, health)

    expect(character.health).toBe(1000)
})

test('character cannot deal damage to itself', () => {
    character = create_character()
    damage = 100

    attach_to_character(character, character, damage)

    expect(character.health).toBe(1000)
})

test('character can deal damage to others', () => {
    character_a = create_character()
    character_b = create_character()
    character_b.health = 200
    damage = 100

    attach_to_character(character_a, character_b, damage)

    expect(character_b.health).toBe(100)
})

test('character can only heal itself', () => {
    character = create_character()
    character.health = 100
    health = 100

    heal_to_character(character, character, health)

    expect(character.health).toBe(200)
})

test('character cannot heal ohter characters', () => {
    character_a = create_character()
    character_b = create_character()
    character_b.health = 100
    health = 100

    heal_to_character(character_a, character_b, health)

    expect(character_b.health).toBe(100)
})

test('when dealing damage, if the target is 5 or more levels above attacker, damaged is reduced by 50%', () =>{
    attacker = create_character()
    target = create_character()
    target.level = 10
    damage = 100

    attach_to_character(attacker, target, damage)

    expect(target.health).toBe(950)
})

test('when dealing damage, if the target is 5 or more levels bellow attacker, damaged is increased by 50%', () =>{
    attacker = create_character()
    attacker.level = 10
    target = create_character()
    damage = 100

    attach_to_character(attacker, target, damage)

    expect(target.health).toBe(850)
})

test('when a character is created belong to no faction', () =>{
    character = create_character()

    expect(character.factions.length).toBe(0)
})

test('a character may join one or more factions', () => {
    character = create_character()
    faction = 'data'

    join_to_faction(character, faction)

    expect(character.factions).toContain('data')
})

test('a character may leave one or more factions', () => {
    character = create_character()
    character.factions = ['data']
    faction = 'data'

    leave_a_faction(character, faction)

    expect(character.factions.length).toBe(0)
})

test('when dealing damage, allies cannot deal damage to one another', () =>{
    attacker = create_character()
    attacker.factions = ["data"]
    target = create_character()
    target.factions = ["data"]
    damage = 100

    attach_to_character(attacker, target, damage)

    expect(target.health).toBe(1000)
})

test('allies can heal one another', () => {
    character_a = create_character()
    character_a.factions = ["data"]
    target = create_character()
    target.factions = ["data"]
    target.health = 100
    health = 100

    heal_to_character(character_a, target, health)

    expect(target.health).toBe(200)
})