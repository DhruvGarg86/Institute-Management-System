package com.institute.entities.enums;

public enum Status {
	ACTIVE, 	// to show a record(student,teacher, etc) are valid
	INACTIVE, 	// Temporarily disabled (left the institute)
	BLOCKED, 	// Blocked due to violations or administrator decision
	SUSPENDED, 	// Pending Fees, dues, course no longer valid
}

