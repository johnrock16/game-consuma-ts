import BACKGROUND_IMAGE from "../assets/background/stars.jpg";
import BACKGROUND_IMAGE2 from "../assets/background/stars2.jpg";
import MUSIC_LEVEL_1 from "../assets/sounds/musics/adventure_themes/exploration.ogg";
import MUSIC_LEVEL_2 from "../assets/sounds/musics/adventure_themes/hurry_up_and_run.ogg";

export const LEVELS = [
    {
        name: "Menu",
        isPlayable: false,
    },
    {
        name: "Level - 1",
        scoreNeeded: 200,
        backgroundSrc: BACKGROUND_IMAGE,
        musicSrc: MUSIC_LEVEL_1,
        isPlayable: true,
    },
    {
        name: "Level - 2",
        scoreNeeded: 400,
        backgroundSrc: BACKGROUND_IMAGE2,
        musicSrc: MUSIC_LEVEL_2,
        isPlayable: true,
    }
]

export default LEVELS;