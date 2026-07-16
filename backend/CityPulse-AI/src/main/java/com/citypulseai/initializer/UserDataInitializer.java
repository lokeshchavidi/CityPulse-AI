package com.citypulseai.initializer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.citypulseai.department.entity.Department;
import com.citypulseai.department.repository.DepartmentRepository;
import com.citypulseai.role.entity.Role;
import com.citypulseai.role.enums.RoleType;
import com.citypulseai.role.repository.RoleRepository;
import com.citypulseai.user.entity.User;
import com.citypulseai.user.repository.UserRepository;
import com.citypulseai.user.util.UserIdGenerator;

import lombok.RequiredArgsConstructor;

@Component
@Order(4)
@RequiredArgsConstructor
public class UserDataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final DepartmentRepository departmentRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserIdGenerator userIdGenerator;
    
    private static final String[][] DEPARTMENT_MANAGERS = {

    	    {"Priya", "Sharma", "roads.manager@citypulse.ai", "9876500001", "Roads & Infrastructure"},
    	    {"Ramesh", "Kumar", "water.manager@citypulse.ai", "9876500002", "Water Supply"},
    	    {"Anjali", "Reddy", "electrical.manager@citypulse.ai", "9876500003", "Electrical"},
    	    {"Meera", "Patel", "sanitation.manager@citypulse.ai", "9876500004", "Sanitation"},
    	    {"Sanjay", "Rao", "health.manager@citypulse.ai", "9876500005", "Public Health"},
    	    {"Arjun", "Verma", "traffic.manager@citypulse.ai", "9876500006", "Traffic Management"},
    	    {"Neha", "Gupta", "parks.manager@citypulse.ai", "9876500007", "Parks & Recreation"},
    	    {"Vikram", "Singh", "animal.manager@citypulse.ai", "9876500008", "Animal Control"},
    	    {"Kiran", "Naidu", "environment.manager@citypulse.ai", "9876500009", "Environmental Services"},
    	    {"Deepak", "Joshi", "planning.manager@citypulse.ai", "9876500010", "Urban Planning & Building Control"}

    	};
    
    private static final String[][] OFFICERS = {

    	    {"Rahul", "Reddy", "roads.officer1@citypulse.ai", "9876600001", "Roads & Infrastructure"},
    	    {"Mahesh", "Rao", "roads.officer2@citypulse.ai", "9876600002", "Roads & Infrastructure"},

    	    {"Suresh", "Kumar", "water.officer1@citypulse.ai", "9876600003", "Water Supply"},
    	    {"Naveen", "Reddy", "water.officer2@citypulse.ai", "9876600004", "Water Supply"},

    	    {"Ajay", "Sharma", "electrical.officer1@citypulse.ai", "9876600005", "Electrical"},
    	    {"Vinay", "Patel", "electrical.officer2@citypulse.ai", "9876600006", "Electrical"},

    	    {"Manoj", "Singh", "sanitation.officer1@citypulse.ai", "9876600007", "Sanitation"},
    	    {"Ravi", "Naidu", "sanitation.officer2@citypulse.ai", "9876600008", "Sanitation"},

    	    {"Kishore", "Rao", "health.officer1@citypulse.ai", "9876600009", "Public Health"},
    	    {"Praveen", "Reddy", "health.officer2@citypulse.ai", "9876600010", "Public Health"},

    	    {"Lokesh", "Kumar", "traffic.officer1@citypulse.ai", "9876600011", "Traffic Management"},
    	    {"Ganesh", "Patel", "traffic.officer2@citypulse.ai", "9876600012", "Traffic Management"},

    	    {"Aravind", "Rao", "parks.officer1@citypulse.ai", "9876600013", "Parks & Recreation"},
    	    {"Sai", "Reddy", "parks.officer2@citypulse.ai", "9876600014", "Parks & Recreation"},

    	    {"Harish", "Naidu", "animal.officer1@citypulse.ai", "9876600015", "Animal Control"},
    	    {"Dinesh", "Singh", "animal.officer2@citypulse.ai", "9876600016", "Animal Control"},

    	    {"Teja", "Kumar", "environment.officer1@citypulse.ai", "9876600017", "Environmental Services"},
    	    {"Rohit", "Patel", "environment.officer2@citypulse.ai", "9876600018", "Environmental Services"},

    	    {"Vamsi", "Reddy", "planning.officer1@citypulse.ai", "9876600019", "Urban Planning & Building Control"},
    	    {"Nikhil", "Sharma", "planning.officer2@citypulse.ai", "9876600020", "Urban Planning & Building Control"}

    	};
    
    private static final String[][] CITIZENS = {

    	    {"Karthik", "Kamuni", "citizen1@citypulse.ai", "9876700001"},
    	    {"Srinivas", "Reddy", "citizen2@citypulse.ai", "9876700002"},
    	    {"Anusha", "Patel", "citizen3@citypulse.ai", "9876700003"}

    	};
    
    @Override
    public void run(String... args) {

        createAdmin();

        createDepartmentManagers();

        createOfficers();

        createCitizens();
    }
    
    private void createAdmin() {

        if (userRepository.existsByEmail("admin@citypulse.ai")) {
            return;
        }

        Role adminRole = getRole(RoleType.ADMIN);

        User admin = User.builder()
                .userId(userIdGenerator.generateUserId())
                .firstName("System")
                .lastName("Administrator")
                .email("admin@citypulse.ai")
                .password(passwordEncoder.encode("Admin@123"))
                .phoneNumber("9999999999")
                .enabled(true)
                .role(adminRole)
                .build();

        userRepository.save(admin);
    }
    
    private void createDepartmentManagers() {

        for (String[] manager : DEPARTMENT_MANAGERS) {

            createDepartmentManager(
                    manager[0], // First Name
                    manager[1], // Last Name
                    manager[2], // Email
                    manager[3], // Phone Number
                    manager[4]  // Department
            );
        }
    }
    
    private void createOfficers() {

        for (String[] officer : OFFICERS) {

            createOfficer(
                    officer[0], // First Name
                    officer[1], // Last Name
                    officer[2], // Email
                    officer[3], // Phone Number
                    officer[4]  // Department
            );
        }
    }
    
    private void createCitizens() {

        for (String[] citizen : CITIZENS) {

            createCitizen(
                    citizen[0], // First Name
                    citizen[1], // Last Name
                    citizen[2], // Email
                    citizen[3]  // Phone Number
            );
        }
    }
    
    private void createDepartmentManager(
            String firstName,
            String lastName,
            String email,
            String phoneNumber,
            String departmentName) {

        if (userRepository.existsByEmail(email)) {
            return;
        }

        Role managerRole = getRole(RoleType.DEPARTMENT_MANAGER);

        Department department = getDepartment(departmentName);

        User manager = User.builder()
                .userId(userIdGenerator.generateUserId())
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .password(passwordEncoder.encode("Manager@123"))
                .phoneNumber(phoneNumber)
                .enabled(true)
                .role(managerRole)
                .department(department)
                .build();

        userRepository.save(manager);
    }
    
    private void createOfficer(
            String firstName,
            String lastName,
            String email,
            String phoneNumber,
            String departmentName) {

        if (userRepository.existsByEmail(email)) {
            return;
        }

        Role officerRole = getRole(RoleType.OFFICER);

        Department department = getDepartment(departmentName);

        User officer = User.builder()
                .userId(userIdGenerator.generateUserId())
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .password(passwordEncoder.encode("Officer@123"))
                .phoneNumber(phoneNumber)
                .enabled(true)
                .role(officerRole)
                .department(department)
                .build();

        userRepository.save(officer);
    }
    
    private void createCitizen(
            String firstName,
            String lastName,
            String email,
            String phoneNumber) {

        if (userRepository.existsByEmail(email)) {
            return;
        }

        Role citizenRole = getRole(RoleType.CITIZEN);

        User citizen = User.builder()
                .userId(userIdGenerator.generateUserId())
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .password(passwordEncoder.encode("Citizen@123"))
                .phoneNumber(phoneNumber)
                .enabled(true)
                .role(citizenRole)
                .build();

        userRepository.save(citizen);
    }

    private Role getRole(RoleType roleType) {

        return roleRepository.findByRoleType(roleType)
                .orElseThrow(() ->
                        new IllegalStateException("Role not found: " + roleType));
    }

    private Department getDepartment(String departmentName) {

        return departmentRepository.findByDepartmentName(departmentName)
                .orElseThrow(() ->
                        new IllegalStateException("Department not found: " + departmentName));
    }
}