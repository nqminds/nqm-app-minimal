const constants = {
  appointmentStatus: {
    accepted: "accepted",
    assigned: "assigned",
    onRoute: "on route",
    inProgress: "in progress",
    complete: "complete",
    completeWarn: "warning",
    completeAlarm: "alarm",
    declined: "declined",
    requested: "requested",
  },
  appointmentUpdate: {
    statusChange: "status change",
    declinedRequest: "declined request",
  },
  careStreamUpdateTypes: {
    adHocUpdate: "ad hoc update",
    appointment: "appointment",
    appointmentUpdate: "appointment update",
    sensorNotification: "sensor notification",
  },
  diaryEventTypes: {
    appointment: "appointment",
    appointmentUpdate: "appointmentUpdate",
    sensorNotification: "sensorNotification",
  },
  schemas: {
    appointment: "appointment",
    careStream: "careStream",
    keyValuePair: "kvp",
    patient: "patient",
    primaryCarer: "primaryCarer",
  },
  levelsOfCare: [
    "administer medicine",
    "cleaning",
    "companionship",
    "cooking",
    "nursing and health checks",
    "personal care - washing and dressing",
  ],
  advertiseRadii: [
    "1 mile",
    "5 miles",
    "10 miles",
    "20 miles",
  ],
};

export default constants;
