var studentDecals = {
  'Green': ['Green', 'Any Decal'],
  'Park & Ride': ['Any Decal'],
  'Red 1': ['Red 1', 'All Red', 'Any Decal'],
  'Red 3': ['All Red', 'Any Decal'],
  'Brown 2': ['Brown 2', 'Any Decal'],
  'Brown 3': ['Brown 3', 'Any Decal'],
  'Disabled Student': ['Disabled', 'Orange', 'Blue', 'Commuter', 'Red 1', 'All Red', 'Brown 2', 'Brown 3', 'Any Decal'],
}

var facultyDecals = {
  'Gold': ['Gated', 'Orange', 'Blue', 'Green', 'Red 1', 'All Red', 'Brown', 'Any Decal'],
  'Silver': ['Gated'],
  'Official Business': ['Orange', 'Blue', 'Green', 'Red 1', 'All Red', 'Brown', 'Any Decal'],
  'Orange': ['Orange', 'Green', 'Any Decal'],
  'Blue': ['Blue', 'Green', 'Any Decal'],
  'Medical Resident': ['Orange', 'Green', 'Red 1', 'All Red', 'Brown', 'Any Decal'],
  'Shands South 1': ['UF Health South Garage'],
  'HVN Shands South 2': ['UF Health South Garage'],
  'Staff Commuter': ['Green', 'Any Decal']
}

// Note 'All Red' means Red except Red 1, Red 1 seems to be privileged
module.exports = {
  decalTypes: {
    'Green': ['Green', 'Any Decal'],
    'Park & Ride': ['Any Decal'],
    'Red 1': ['Red 1', 'All Red', 'Any Decal'],
    'Red 3': ['All Red', 'Any Decal'],
    'Brown 2': ['Brown 2', 'Any Decal'],
    'Brown 3': ['Brown 3', 'Any Decal'],
    'Disabled Student': ['Disabled', 'Orange', 'Blue', 'Commuter', 'Red 1', 'All Red', 'Brown 2', 'Brown 3', 'Any Decal'],

    'Gold': ['Gated', 'Orange', 'Blue', 'Green', 'Red 1', 'All Red', 'Brown', 'Any Decal'],
    'Silver': ['Gated'],
    'Official Business': ['Orange', 'Blue', 'Green', 'Red 1', 'All Red', 'Brown', 'Any Decal'],
    'Orange': ['Orange', 'Green', 'Any Decal'],
    'Blue': ['Blue', 'Green', 'Any Decal'],
    'Medical Resident': ['Orange', 'Green', 'Red 1', 'All Red', 'Brown', 'Any Decal', 'Med Res'],
    'Shands South 1': ['Yellow'],
    'HVN Shands South 2': ['Yellow'],
    'Staff Commuter': ['Green', 'Any Decal'],

    'Motorcycle / Scooter': ['Motorcycle / Scooter']
  },

  // Returns an array populated with the names of available decals
  getDecals: function () { Object.keys(this.decalTypes) },

  // Given a valid decal name, returns an array with the parking options you have available
  getParkingOptions: function (decal) { return this.decalTypes[decal] }
}
