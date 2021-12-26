import { Node } from '../..';
import Track from '../Track';

// ---------- Vulkava typings ----------
export type OutgoingDiscordPayload = {
  op: number;
  d: Record<string, unknown>;
};

export type IncomingDiscordPayload = {
  op: number;
  d?: unknown;
  s?: number;
  t?: string;
};

export type VoiceStateUpdatePayload = IncomingDiscordPayload & {
  t: 'VOICE_STATE_UPDATE';
  d: {
    session_id: string;
    user_id: string;
    guild_id: string;
  };
};

type VoiceServerUpdateData = {
  token: string;
  guild_id: string;
  endpoint: string;
};

export type VoiceServerUpdatePayload = IncomingDiscordPayload & {
  t: 'VOICE_SERVER_UPDATE';
  d: VoiceServerUpdateData;
};

/** Main constructor options */
export type VulkavaOptions = {
  /** The array of lavalink nodes */
  nodes: NodeOptions[];
  /** Function to send voice channel connect payloads to discord */
  sendWS: (guildId: string, payload: OutgoingDiscordPayload) => void;
  /** The defautl source to search for tracks */
  defaultSearchSource?: SEARCH_SOURCE;
};

/** Vulkava events */
export type EventListeners<T> = {
  (event: 'raw', listener: (payload: unknown) => void): T;
  (event: 'nodeConnect', listener: (node: Node) => void): T;
  (event: 'nodeResume', listener: (node: Node) => void): T;
  (event: 'nodeDisconnect', listener: (node: Node) => void): T;
  (event: 'nodeWarn', listener: (node: Node, warn: string) => void): T;
  (event: 'nodeError', listener: (node: Node, error: Error) => void): T;
}

// Search sources (the last two only works on my lavalink (https://github.com/davidffa/lavalink/releases) )
export type SEARCH_SOURCE = 'youtube' | 'youtubemusic' | 'soundcloud' | 'odysee' | 'yandex';

// -- REST --

type PlaylistInfo = {
  selectedTrack: number;
  title: string;
  duration: number;
};

type TrackInfo = {
  identifier: string;
  thumbnail?: string;
  isSeekable: boolean;
  author: string;
  length: number;
  isStream: boolean;
  source?: string;
  sourceName?: string;
  position: number;
  title: string;
  uri: string;
};
export interface ITrack {
  track: string;
  info: TrackInfo;
}

type LoadException = {
  message: string;
  severity: 'COMMON' | 'SUSPIOUS' | 'FAULT';
}

type LoadResultBase = {
  loadType: 'TRACK_LOADED' | 'PLAYLIST_LOADED' | 'SEARCH_RESULT' | 'NO_MATCHES' | 'LOAD_FAILED';
  playlistInfo: PlaylistInfo;
  exception?: LoadException;
}
export type LoadTracksResult = LoadResultBase & {
  tracks: ITrack[];
}

export type SearchResult = LoadResultBase & {
  tracks: Track[];
}

// -- END REST --

// ---------- End of Vulkava typings ----------

// ---------- Node typings ----------

/** Lavalink node options */
export type NodeOptions = {
  /** The node identifier */
  id?: string;
  /** The node hostname */
  hostname: string;
  /** The node port */
  port: number;
  /** Whether to use SSL/TLS or not */
  secure?: boolean;
  /** The node password */
  password?: string;
  /** The node region */
  region?: 'USA' | 'EU';
  /** The resume key */
  resumeKey?: string;
  /** The resume timeout, in seconds */
  resumeTimeout?: number;
  /** The max number of retry attempts */
  maxRetryAttempts?: number;
  /** The interval between retry attempts */
  retryAttemptsInterval?: number;
};

/** Lavalink node stats */
export type NodeStats = {
  /** The amount of playing players */
  playingPlayers: number;
  /** The total player amount */
  players: number;
  /** The lavalink node uptime, in seconds */
  uptime: number;
  /** RAM stats, in bytes */
  memory: {
    reservable: number;
    used: number;
    free: number;
    allocated: number;
  };
  /** CPU stats, [0, 1] */
  cpu: {
    cores: number;
    systemLoad: number;
    lavalinkLoad: number;
  };
  /** Audio frame stats */
  frameStats: {
    sent: number;
    nulled: number;
    deficit: number;
  };
};

/** Lavalink node incoming payloads */
export interface PlayerEventPayload {
  op: 'event';
  type: 'TrackStartEvent' | 'TrackEndEvent' | 'TrackExceptionEvent' | 'TrackStuckEvent' | 'WebSocketClosedEvent';
}

export type PlayerState = {
  /** Unix timestamp when the position was picked */
  time: number;
  /** Track position in ms */
  position?: number;
  /** Whether the player is connected to discord voice gateway */
  connected: boolean;
};

// ---------- End of Node typings ----------

// ---------- Player typings ----------

// Main constructor options
export type PlayerOptions = {
  /** The guild id that player belongs to */
  guildId: string;
  /** The voice channel id */
  voiceChannelId: string;
  /** The text channel id */
  textChannelId?: string;
  /** Whether the bot joins the voice channel deafened or not */
  selfDeaf?: boolean;
  /** Whether the bot joins the voice channel muted or not */
  selfMute?: boolean;
};

export type VoiceState = {
  sessionId: string;
  event: VoiceServerUpdateData;
};

export type PlayOptions = {
  startTime?: number;
  endTime?: number;
  pause?: boolean;
  noReplace?: boolean;
};

// ---------- End of Player typings ----------