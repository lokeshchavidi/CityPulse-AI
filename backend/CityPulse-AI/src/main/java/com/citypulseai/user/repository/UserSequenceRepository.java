package com.citypulseai.user.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.citypulseai.user.entity.UserSequence;

public interface UserSequenceRepository extends JpaRepository<UserSequence, Long>{

}
