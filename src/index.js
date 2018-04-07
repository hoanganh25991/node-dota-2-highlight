import {getMatchInfo, getHighlightChunks} from "./openDota";

export const buildHightLight = async matchId => {
	const matchInfo = await getMatchInfo({matchId})
	const highlightChunks = getHighlightChunks({matchInfo})

	const videoPath = "C:/work-station/node-video-to-mp3/videos/dota-2-replay_2018-04-05_214857.wmv"
	const chunkVideos = await getChunksFromVideo({videoPath, highlightChunks})

	const fileList = getFileList({chunkVideos})
	const highlightVideo = await mergeChunkVideos({fileList})
	return highlightVideo;
}