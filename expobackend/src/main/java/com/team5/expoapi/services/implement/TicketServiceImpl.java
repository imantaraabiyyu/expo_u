package com.team5.expoapi.services.implement;

import java.util.List;

import com.team5.expoapi.entities.Ticket;
import com.team5.expoapi.entities.Transaction;
import com.team5.expoapi.repositories.TicketRepository;
import com.team5.expoapi.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class TicketServiceImpl
  extends CommonServiceImpl<Ticket, Integer>
  implements TicketService {
  @Autowired
  private TicketRepository repository;

  @Override
  protected JpaRepository<Ticket, Integer> getRepository() {
    return repository;
  }

  @Override
  public List<Ticket> findByTransaction(Transaction transaction) {
    return repository.findByTransaction(transaction);
  }

    @Override
    public Ticket findFirstByCodePrefixOrderByCodeSeqDesc(String codePrefix) {
      return repository.findFirstByCodePrefixOrderByCodeSeqDesc(codePrefix);
    }
}
