package com.citypulseai.complaint.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.citypulseai.complaint.entity.ComplaintSequence;

public interface ComplaintSequenceRepository extends JpaRepository<ComplaintSequence, Long>{

}
