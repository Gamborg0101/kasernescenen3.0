'use server';
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoomAction = updateRoomAction;
exports.deleteRoom = deleteRoom;
exports.createRoom = createRoom;
var authSetup_1 = require("@/auth/authSetup");
var cache_1 = require("next/cache");
var rooms_1 = require("../db/rooms");
var ratelimiter_1 = require("../ratelimiter");
var errorMessages_1 = require("../errorMessages");
var successMessages_1 = require("../successMessages");
var z = require("zod");
var roomSchema = z.object({
    name: z.string().min(5).max(30),
    roomNumber: z.string().regex(/^\d{4}-\d{3}[A-Z]?$/),
    capacity: z.number().int().min(5).max(200),
    location: z.string().min(5).max(40),
});
var roomIdSchema = z.number().int().positive();
function updateRoomAction(roomId, data) {
    return __awaiter(this, void 0, void 0, function () {
        var session, roomIdValid, rawRoomInfo, updateRoomData, userId, rateLimited, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, authSetup_1.auth)()];
                case 1:
                    session = _a.sent();
                    if (!session)
                        return [2 /*return*/, errorMessages_1.sessionError];
                    roomIdValid = roomIdSchema.safeParse(roomId);
                    if (!roomIdValid.success)
                        return [2 /*return*/, errorMessages_1.failedToUpdateRoom];
                    rawRoomInfo = {
                        name: data.name,
                        roomNumber: data.roomNumber,
                        capacity: data.capacity,
                        location: data.location,
                    };
                    updateRoomData = roomSchema.safeParse(rawRoomInfo);
                    if (!updateRoomData.success)
                        return [2 /*return*/, errorMessages_1.failedToUpdateRoom];
                    userId = Number(session.user.id);
                    return [4 /*yield*/, ratelimiter_1.ratelimit.limit("room:update:".concat(userId))];
                case 2:
                    rateLimited = _a.sent();
                    if (!rateLimited.success) {
                        return [2 /*return*/, errorMessages_1.ratelimitError];
                    }
                    if (session.user.role !== 'admin')
                        return [2 /*return*/, errorMessages_1.unauthorizedAccess];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, (0, rooms_1.updateRoom)(roomIdValid.data, updateRoomData.data)];
                case 4:
                    _a.sent();
                    return [2 /*return*/, successMessages_1.successUpdateRoom];
                case 5:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [2 /*return*/, errorMessages_1.failedToUpdateRoom];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function deleteRoom(roomId) {
    return __awaiter(this, void 0, void 0, function () {
        var session, userId, validRoomId, rateLimited, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, authSetup_1.auth)()];
                case 1:
                    session = _a.sent();
                    if (!session)
                        return [2 /*return*/, errorMessages_1.sessionError];
                    userId = Number(session.user.id);
                    validRoomId = roomIdSchema.safeParse(roomId);
                    if (!validRoomId.success) {
                        return [2 /*return*/, errorMessages_1.failedToDeleteRoom];
                    }
                    return [4 /*yield*/, ratelimiter_1.ratelimit.limit("room:delete:".concat(userId))];
                case 2:
                    rateLimited = _a.sent();
                    if (!rateLimited.success) {
                        return [2 /*return*/, errorMessages_1.ratelimitError];
                    }
                    if (session.user.role !== 'admin')
                        return [2 /*return*/, errorMessages_1.unauthorizedAccess];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 6, , 7]);
                    return [4 /*yield*/, (0, rooms_1.DeleteRoomBookings)(validRoomId.data)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, rooms_1.deleteRoomFromDb)(validRoomId.data)];
                case 5:
                    _a.sent();
                    return [2 /*return*/, successMessages_1.successDeleteRoom];
                case 6:
                    e_2 = _a.sent();
                    console.error(e_2);
                    return [2 /*return*/, errorMessages_1.failedToDeleteRoom];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function createRoom(room) {
    return __awaiter(this, void 0, void 0, function () {
        var session, userId, createRoomData, rateLimited, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, authSetup_1.auth)()];
                case 1:
                    session = _a.sent();
                    if (!session)
                        return [2 /*return*/, errorMessages_1.sessionError];
                    if (session.user.role !== 'admin')
                        return [2 /*return*/, errorMessages_1.unauthorizedAccess];
                    if (!room)
                        return [2 /*return*/, errorMessages_1.failedToFindRoom];
                    userId = Number(session.user.id);
                    createRoomData = roomSchema.safeParse(room);
                    return [4 /*yield*/, ratelimiter_1.ratelimit.limit("room:create:".concat(userId))];
                case 2:
                    rateLimited = _a.sent();
                    if (!rateLimited.success) {
                        return [2 /*return*/, errorMessages_1.ratelimitError];
                    }
                    if (!createRoomData.success) {
                        return [2 /*return*/, errorMessages_1.failedToCreateRoom];
                    }
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, (0, rooms_1.createRoomDB)(createRoomData.data)];
                case 4:
                    _a.sent();
                    (0, cache_1.revalidatePath)('/adminpanel/managerooms');
                    return [2 /*return*/, successMessages_1.successCreateRoom];
                case 5:
                    e_3 = _a.sent();
                    console.error(e_3);
                    return [2 /*return*/, errorMessages_1.failedToCreateRoom];
                case 6: return [2 /*return*/];
            }
        });
    });
}
createRoom({
    name: '1584-299A',
    roomNumber: '299A',
    capacity: 200,
    location: 'lige her',
});
createRoom({
    name: 'Hej på dig',
    roomNumber: '299B',
    capacity: 149,
    location: 'ikke lige her',
});
