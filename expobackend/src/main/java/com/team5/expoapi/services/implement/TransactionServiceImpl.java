package com.team5.expoapi.services.implement;

import com.team5.expoapi.dto.UserCredit;
import com.team5.expoapi.entities.Credit;
import com.team5.expoapi.entities.Pricing;
import com.team5.expoapi.entities.Ticket;
import com.team5.expoapi.entities.Transaction;
import com.team5.expoapi.entities.User;
import com.team5.expoapi.exceptions.CreditNotEnoughException;
import com.team5.expoapi.exceptions.StockLessThanQuantityException;
import com.team5.expoapi.repositories.TransactionRepository;
import com.team5.expoapi.services.CreditService;
import com.team5.expoapi.services.PricingService;
import com.team5.expoapi.services.TicketService;
import com.team5.expoapi.services.TransactionService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class TransactionServiceImpl
  extends CommonServiceImpl<Transaction, String>
  implements TransactionService {
  @Autowired
  private TransactionRepository repository;

  @Autowired
  private TicketService ticketService;

  @Autowired
  private PricingService pricingService;

  @Autowired
  private CreditService creditService;

  @Override
  protected JpaRepository<Transaction, String> getRepository() {
    return repository;
  }

  @Override
  public Transaction buy(Transaction entity, Integer pricing_id) {
    Transaction transaction = new Transaction();
    Pricing pricing = pricingService.findById(pricing_id);
    UserCredit creditSaldo = creditService.findTotalCredit(
      entity.getUser(),
      entity.getUser().getId()
    );

    if (pricing.getStock() < entity.getQuantity()) {
      throw new StockLessThanQuantityException();
    } else if (entity.getGrand() > creditSaldo.getAmount()) {
      throw new CreditNotEnoughException();
    } else {
      transaction = repository.save(entity);
      pricing.setStock(pricing.getStock() - transaction.getQuantity());
      pricing.setEvent(entity.getPricing().getEvent());
      // WILL DELETED
      System.out.println(pricing);
      pricingService.save(pricing);
      Credit credit = new Credit();
      credit.setUser(entity.getUser());
      credit.setAmount(-entity.getGrand());
      creditService.save(credit);
      for (int i = 0; i < entity.getQuantity(); i++) {
        Ticket ticket = new Ticket();
        ticket.setTransaction(transaction);
        ticket.setCodePrefix(entity.getPricing().getCodename());
        String codeName = ticket.getCodePrefix();
        Ticket getLast = ticketService.findFirstByCodePrefixOrderByCodeSeqDesc(
          codeName
        );

        if (getLast == null) {
          ticket.setCodeSeq(1);
        } else {
          ticket.setCodeSeq(getLast.getCodeSeq() + 1);
        }

        ticketService.save(ticket);
      }
    }

    return transaction;
  }

  @Override
  public List<Transaction> findByUserOrderByIdDesc(User user) {
    return repository.findByUserOrderByIdDesc(user);
  }
}
