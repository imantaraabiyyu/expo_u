package com.team5.expoapi.entities;

import com.team5.expoapi.entities.enums.EventTier;
import com.team5.expoapi.entities.enums.Status;
import com.team5.expoapi.validation.annotations.enums.EventTierAttributeConverter;
import com.team5.expoapi.validation.annotations.enums.StatusAttributeConverter;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Table(name = "event")
@Entity
public class Event extends AbstractEntity {
  private String name;

  @OneToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
  @JoinTable(
    name = "Event_Location",
    joinColumns = {
      @JoinColumn(name = "EVENT_ID", referencedColumnName = "id")
    },
    inverseJoinColumns = {
      @JoinColumn(name = "LOCATION_ID", referencedColumnName = "id")
    }
  )
  private Location location;

  private String description;

  @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
  @JoinTable(
    name = "EVENT_EO",
    joinColumns = {
      @JoinColumn(name = "EVENT_ID", referencedColumnName = "id")
    },
    inverseJoinColumns = {
      @JoinColumn(name = "EO_ID", unique = false, referencedColumnName = "id")
    }
  )
  private EventOrganizer organizer;

  @Column(name = "start_date")
  private LocalDate startDate;

  @Column(name = "end_date")
  private LocalDate endDate;

  @Column(name = "start_time")
  private LocalTime startTime;

  @Column(name = "end_time")
  private LocalTime endTime;

  private Integer capacity;

  @Column(name = "event_tier")
  @Convert(converter = EventTierAttributeConverter.class)
  private EventTier eventTier;

  @Column(name = "event_status")
  @Convert(converter = StatusAttributeConverter.class)
  private Status status;

  @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
  @JoinTable(
    name = "EVENT_CATEGORY",
    joinColumns = @JoinColumn(name = "EVENT_ID"),
    inverseJoinColumns = @JoinColumn(name = "CATEGORY_ID")
  )
  private Set<Category> categories = new HashSet<>();

  @OneToMany(mappedBy = "event", fetch = FetchType.LAZY)
  private List<Pricing> pricings = new ArrayList<>();

  @OneToMany(
    fetch = FetchType.LAZY,
    targetEntity = EventMerchant.class,
    mappedBy = "pk.event",
    cascade = CascadeType.ALL
  )
  private Set<EventMerchant> eventMerchants = new HashSet<>();

  public Event() {}

  public Event(Status status) {
    this.status = status;
  }

  public Event(EventOrganizer organizer) {
    this.organizer = organizer;
  }

  public Event(Set<Category> categories) {
    this.categories = categories;
  }

  public Event(
    EventOrganizer organizer,
    Status status,
    Set<Category> categories
  ) {
    this.organizer = organizer;
    this.status = status;
    this.categories = categories;
  }

  public Event(EventOrganizer organizer, Status status) {
    this.organizer = organizer;
    this.status = status;
  }

  public Event(
    String name,
    Location location,
    String description,
    EventOrganizer organizer,
    LocalDate startDate,
    LocalDate endDate,
    LocalTime startTime,
    LocalTime endTime,
    Integer capacity,
    EventTier eventTier,
    Status status,
    Set<Category> categories,
    List<Pricing> pricings
  ) {
    this.name = name;
    this.location = location;
    this.description = description;
    this.organizer = organizer;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.capacity = capacity;
    this.eventTier = eventTier;
    this.status = status;
    this.categories = categories;
    this.pricings = pricings;
  }

  public Event(
    String name,
    Location location,
    String description,
    LocalDate startDate,
    LocalDate endDate,
    LocalTime startTime,
    LocalTime endTime,
    Integer capacity,
    EventTier eventTier,
    Status status,
    Set<Category> categories,
    List<Pricing> pricings,
    Set<EventMerchant> eventMerchants
  ) {
    this.name = name;
    this.location = location;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.capacity = capacity;
    this.eventTier = eventTier;
    this.status = status;
    this.categories = categories;
    this.pricings = pricings;
    this.eventMerchants = eventMerchants;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Location getLocation() {
    return this.location;
  }

  public void setLocation(Location location) {
    this.location = location;
  }

  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public EventOrganizer getOrganizer() {
    return this.organizer;
  }

  public void setOrganizer(EventOrganizer organizer) {
    this.organizer = organizer;
  }

  public LocalDate getStartDate() {
    return this.startDate;
  }

  public void setStartDate(LocalDate startDate) {
    this.startDate = startDate;
  }

  public LocalDate getEndDate() {
    return this.endDate;
  }

  public void setEndDate(LocalDate endDate) {
    this.endDate = endDate;
  }

  public LocalTime getStartTime() {
    return this.startTime;
  }

  public void setStartTime(LocalTime startTime) {
    this.startTime = startTime;
  }

  public LocalTime getEndTime() {
    return this.endTime;
  }

  public void setEndTime(LocalTime endTime) {
    this.endTime = endTime;
  }

  public Integer getCapacity() {
    return this.capacity;
  }

  public void setCapacity(Integer capacity) {
    this.capacity = capacity;
  }

  public EventTier getEventTier() {
    return this.eventTier;
  }

  public void setEventTier(EventTier eventTier) {
    this.eventTier = eventTier;
  }

  public Status getStatus() {
    return this.status;
  }

  public void setStatus(Status status) {
    this.status = status;
  }

  public Set<Category> getCategories() {
    return this.categories;
  }

  public void setCategories(Set<Category> categories) {
    this.categories = categories;
  }

  public List<Pricing> getPricings() {
    return this.pricings;
  }

  public void setPricings(List<Pricing> pricings) {
    this.pricings = pricings;
  }

  public Set<EventMerchant> getEventMerchants() {
    return this.eventMerchants;
  }

  public void setEventMerchants(Set<EventMerchant> eventMerchants) {
    this.eventMerchants = eventMerchants;
  }
}
