import { useEffect, useState } from "react";
import { getUserSoundLink } from "../../api/profile";
import AudioPlayer from "./AudioPlayer";

export default function Sound({ sound, trackIndex }) {
    const [audioLink, setAudioLink] = useState(null);

    useEffect(() => {
        getUserSoundLink(sound.uuid, (url) => setAudioLink(url))
    }, []);

    const track = {
        id: trackIndex,
        url: audioLink,
        title: sound.name,
        artist: sound.artist
    }

    return (<AudioPlayer track={track} />)
}