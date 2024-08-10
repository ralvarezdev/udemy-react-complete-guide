export const SYMBOLS= Object.freeze(["X", "O"])
export const PLAYERS = Object.freeze([
        ...SYMBOLS.map(
            (_, index)=>`Player ${index+1}`)
    ])