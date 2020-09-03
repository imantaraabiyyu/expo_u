package com.team5.expoapi.repositories;

import java.util.List;

import com.team5.expoapi.entities.Ticket;
import com.team5.expoapi.entities.Transaction;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {

    List<Ticket> findByTransaction(Transaction transaction);
    Ticket findFirstByCodePrefixOrderByCodeSeqDesc(String codePrefix);
}
