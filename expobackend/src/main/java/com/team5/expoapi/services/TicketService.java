package com.team5.expoapi.services;

import java.util.List;

import com.team5.expoapi.entities.Ticket;
import com.team5.expoapi.entities.Transaction;

public interface TicketService extends CommonService<Ticket, Integer> {
    
    List<Ticket> findByTransaction(Transaction transaction);
    Ticket findFirstByCodePrefixOrderByCodeSeqDesc(String codePrefix);


}
