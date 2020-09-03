package com.team5.expoapi.controller;

import com.team5.expoapi.entities.Ticket;
import com.team5.expoapi.entities.Transaction;
import com.team5.expoapi.entities.enums.TransactionTypes;
import com.team5.expoapi.models.PageAbleModel;
import com.team5.expoapi.models.ResponseModel;
import com.team5.expoapi.models.TicketModel;
import com.team5.expoapi.models.TransactionModel;
import com.team5.expoapi.services.TicketService;
import com.team5.expoapi.services.TransactionService;
import java.lang.reflect.Type;
import java.util.List;
import javax.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
  @Autowired
  private TransactionService transactionService;

  @Autowired
  private TicketService ticketService;

  @GetMapping(produces = "application/json")
  public ResponseModel<PageAbleModel<TransactionModel>> findAll(
    @RequestParam(required = false) Integer transType,
    @RequestParam(required = false) String username,
    @RequestParam(required = false) String email,
    @RequestParam(defaultValue = "asc") String sort,
    @RequestParam(defaultValue = "0") Integer page,
    @RequestParam(defaultValue = "10") Integer size
  ) {
    Transaction entity = new Transaction();
    if (transType != null) {
      entity = new Transaction(TransactionTypes.toEnum(transType));
    } else {
      entity = new Transaction();
    }

    Sort.Direction direction = sort != null
      ? Sort.Direction.valueOf(sort.toUpperCase())
      : null;

    Page<Transaction> pageTransactions = transactionService.findAll(
      entity,
      page,
      size,
      direction
    );
    List<Transaction> Transactions = pageTransactions.toList();

    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<TransactionModel>>() {}.getType();

    List<TransactionModel> TransactionModels = modelMapper.map(
      Transactions,
      type
    );
    PageAbleModel<TransactionModel> data = new PageAbleModel<>(
      TransactionModels,
      pageTransactions.getNumber(),
      pageTransactions.getSize(),
      pageTransactions.getTotalElements()
    );

    return ResponseModel.success(data);
  }

  @GetMapping(path = "/{id}", produces = "application/json")
  public ResponseModel<TransactionModel> findById(@PathVariable String id) {
    Transaction Transaction = transactionService.findById(id);

    ModelMapper modelMapper = new ModelMapper();
    TransactionModel data = modelMapper.map(
      Transaction,
      TransactionModel.class
    );

    return ResponseModel.success(data);
  }

  @GetMapping(path = "/{id}/tickets", produces = "application/json")
  public ResponseModel<PageAbleModel<TicketModel>> findByTicket(
    @PathVariable String id
  ) {
    Transaction transaction = transactionService.findById(id);
    List<Ticket> entity = ticketService.findByTransaction(transaction);
    Page<Ticket> pageTicket = new PageImpl<>(entity);
    List<Ticket> ticket = pageTicket.toList();

    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<TicketModel>>() {}.getType();
    List<TicketModel> ticketModels = modelMapper.map(ticket, type);
    PageAbleModel<TicketModel> data = new PageAbleModel<>(
      ticketModels,
      pageTicket.getNumber(),
      pageTicket.getSize(),
      pageTicket.getTotalElements()
    );

    return ResponseModel.success(data);
  }

  @PostMapping(produces = "application/json", consumes = "application/json")
  public ResponseModel<TransactionModel> add(
    @RequestBody @Valid TransactionModel model,
    @RequestParam(required = true) Integer type
  ) {
    Transaction addedTransaction = transactionService.buy(
      new Transaction(
        model.getPricing(),
        model.getUser(),
        model.getQuantity(),
        model.getGrand(),
        TransactionTypes.toEnum(type)
      ),
      model.getPricing().getId()
    );

    ModelMapper modelMapper = new ModelMapper();
    TransactionModel data = modelMapper.map(
      addedTransaction,
      TransactionModel.class
    );

    return ResponseModel.successAdd(data);
  }

  @PutMapping(
    path = "/{id}",
    produces = "application/json",
    consumes = "application/json"
  )
  public ResponseModel<TransactionModel> edit(
    @RequestBody @Valid TransactionModel model
  ) {
    model.setId(model.getId());
    ModelMapper modelMapper = new ModelMapper();
    Transaction entity = transactionService.findById(model.getId());
    modelMapper.map(model, entity);

    Transaction editedTransaction = transactionService.save(entity);
    TransactionModel data = modelMapper.map(
      editedTransaction,
      TransactionModel.class
    );
    return ResponseModel.success(data);
  }

  @DeleteMapping(path = "/{id}", produces = "application/json")
  public ResponseModel<TransactionModel> delete(@PathVariable String id) {
    Transaction deletedTransaction = transactionService.removeById(id);

    ModelMapper modelMapper = new ModelMapper();
    TransactionModel data = modelMapper.map(
      deletedTransaction,
      TransactionModel.class
    );

    return ResponseModel.success(data);
  }

  @DeleteMapping(produces = "application/json")
  public ResponseModel<List<TransactionModel>> delete(
    @RequestParam String[] ids
  ) {
    List<Transaction> deletedTransactions = transactionService.removeAll(ids);
    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<TransactionModel>>() {}.getType();
    List<TransactionModel> data = modelMapper.map(deletedTransactions, type);

    return ResponseModel.success(data);
  }
}
