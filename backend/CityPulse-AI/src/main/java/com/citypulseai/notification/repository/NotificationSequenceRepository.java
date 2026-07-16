package com.citypulseai.notification.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.citypulseai.notification.entity.NotificationSequence;

public interface NotificationSequenceRepository extends JpaRepository<NotificationSequence, Long>{

}
