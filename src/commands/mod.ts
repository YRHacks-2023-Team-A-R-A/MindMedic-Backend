import WipeHistory from "./wipe_history.js"
import StartSession from "./start_session.js"
import EndSession from "./end_session.js"
import Personality from "./personality.js"
import AddUser from "./add_user.js"
import LeaveSession from "./leave_session.js"

export const Commands = {
    "wipe-history": WipeHistory,
    "start-session": StartSession,
    "end-session": EndSession,
    "personality": Personality,
    "add-user": AddUser,
    "leave-session": LeaveSession
}