-- CreateTable
CREATE TABLE "Goals" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ExersizeMachines" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "pic" TEXT NOT NULL,
    "numUnits" INTEGER NOT NULL,
    "maxAge" INTEGER NOT NULL,
    "maxWeight" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "DifficultyLevels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numLevel" INTEGER NOT NULL DEFAULT 1,
    "workoutLength" INTEGER NOT NULL,
    "Instructions" TEXT NOT NULL,
    "machineId" INTEGER NOT NULL,
    CONSTRAINT "DifficultyLevels_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "ExersizeMachines" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MachinePurposes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "machinesId" INTEGER NOT NULL,
    "goalId" INTEGER NOT NULL,
    CONSTRAINT "MachinePurposes_machinesId_fkey" FOREIGN KEY ("machinesId") REFERENCES "ExersizeMachines" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MachinePurposes_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goals" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "dateOfBirth" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Workouts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "time" DATETIME NOT NULL,
    "diffacalty" INTEGER NOT NULL,
    "workoutLength" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Workouts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WorkoutGoals" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "priorityLevel" INTEGER NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "goalId" INTEGER NOT NULL,
    CONSTRAINT "WorkoutGoals_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workouts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WorkoutGoals_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goals" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MachinesPerWorkout" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "SerialNumber" INTEGER NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "machineDifficultyId" INTEGER NOT NULL,
    CONSTRAINT "MachinesPerWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workouts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MachinesPerWorkout_machineDifficultyId_fkey" FOREIGN KEY ("machineDifficultyId") REFERENCES "DifficultyLevels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Goals_name_key" ON "Goals"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ExersizeMachines_name_key" ON "ExersizeMachines"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ExersizeMachines_pic_key" ON "ExersizeMachines"("pic");

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_password_key" ON "Users"("password");

-- CreateIndex
CREATE UNIQUE INDEX "MachinesPerWorkout_SerialNumber_key" ON "MachinesPerWorkout"("SerialNumber");
