export class Character {
  constructor(x, y, width, height, color, name, health, damage) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.name = name
    this.health = health
    this.maxhealth = health
    this.damage = damage
  }

  isAlive() {
    return this.health > 0
  }
}
