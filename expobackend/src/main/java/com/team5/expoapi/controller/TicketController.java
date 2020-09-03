package com.team5.expoapi.controller;

import com.team5.expoapi.entities.Ticket;
import com.team5.expoapi.models.PageAbleModel;
import com.team5.expoapi.models.ResponseModel;
import com.team5.expoapi.models.TicketModel;
import com.team5.expoapi.services.TicketService;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.List;
import javax.validation.Valid;
import net.glxn.qrgen.javase.QRCode;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
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
@RequestMapping("/tickets")
public class TicketController {
  @Autowired
  private TicketService ticketService;

  @GetMapping(produces = "application/json")
  public ResponseModel<PageAbleModel<TicketModel>> findAll(
    @RequestParam(required = false) String username,
    @RequestParam(required = false) String email,
    @RequestParam(defaultValue = "asc") String sort,
    @RequestParam(defaultValue = "0") Integer page,
    @RequestParam(defaultValue = "10") Integer size
  ) {
    Ticket entity = new Ticket();
    Sort.Direction direction = sort != null
      ? Sort.Direction.valueOf(sort.toUpperCase())
      : null;

    Page<Ticket> pageTickets = ticketService.findAll(
      entity,
      page,
      size,
      direction
    );
    List<Ticket> Tickets = pageTickets.toList();

    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<TicketModel>>() {}.getType();

    List<TicketModel> TicketModels = modelMapper.map(Tickets, type);
    PageAbleModel<TicketModel> data = new PageAbleModel<>(
      TicketModels,
      pageTickets.getNumber(),
      pageTickets.getSize(),
      pageTickets.getTotalElements()
    );

    return ResponseModel.success(data);
  }

  @GetMapping(path = "/{id}", produces = "application/json")
  public ResponseModel<TicketModel> findById(@PathVariable Integer id) {
    Ticket Ticket = ticketService.findById(id);

    ModelMapper modelMapper = new ModelMapper();
    TicketModel data = modelMapper.map(Ticket, TicketModel.class);

    return ResponseModel.success(data);
  }

  @GetMapping(
    path = "/qr/{id}",
    value = "/qr/{id}",
    produces = MediaType.IMAGE_PNG_VALUE,
    consumes = "application/json"
  )
  public ResponseModel<byte[]> qrGenrator(@PathVariable Integer id)
    throws IOException {
    byte[] bytes = QRCode
      .from(ticketService.findById(id).toString())
      .withSize(250, 250)
      .stream()
      .toByteArray();
    // byte[] bytes = stream.toByteArray();

    // ByteArrayInputStream bis = new ByteArrayInputStream(stream.toByteArray());

    return ResponseModel.success(bytes);
  }

  @PostMapping(produces = "application/json", consumes = "application/json")
  public ResponseModel<TicketModel> add(@RequestBody @Valid TicketModel model) {
    Ticket addedTicket = ticketService.save(
      new Ticket(model.getTransaction(), model.getCodePrefix(), model.getCodeSeq(), model.getStatus())
    );

    ModelMapper modelMapper = new ModelMapper();
    TicketModel data = modelMapper.map(addedTicket, TicketModel.class);

    return ResponseModel.successAdd(data);
  }

  @PutMapping(
    path = "/{id}",
    produces = "application/json",
    consumes = "application/json"
  )
  public ResponseModel<TicketModel> edit(
    @RequestBody @Valid TicketModel model
  ) {
    model.setId(model.getId());
    ModelMapper modelMapper = new ModelMapper();
    Ticket entity = ticketService.findById(model.getId());
    modelMapper.map(model, entity);

    Ticket editedTicket = ticketService.save(entity);
    TicketModel data = modelMapper.map(editedTicket, TicketModel.class);
    return ResponseModel.success(data);
  }

  @DeleteMapping(path = "/{id}", produces = "application/json")
  public ResponseModel<TicketModel> delete(@PathVariable Integer id) {
    Ticket deletedTicket = ticketService.removeById(id);

    ModelMapper modelMapper = new ModelMapper();
    TicketModel data = modelMapper.map(deletedTicket, TicketModel.class);

    return ResponseModel.success(data);
  }

  @DeleteMapping(produces = "application/json")
  public ResponseModel<List<TicketModel>> delete(@RequestParam Integer[] ids) {
    List<Ticket> deletedTickets = ticketService.removeAll(ids);
    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<TicketModel>>() {}.getType();
    List<TicketModel> data = modelMapper.map(deletedTickets, type);

    return ResponseModel.success(data);
  }
}
