package com.team5.expoapi.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.team5.expoapi.entities.Category;
import com.team5.expoapi.entities.EventOrganizer;
import com.team5.expoapi.entities.Location;
import com.team5.expoapi.entities.Merchant;
import com.team5.expoapi.entities.Pricing;
import com.team5.expoapi.entities.enums.EventTier;
import com.team5.expoapi.entities.enums.Status;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

public class EventModel {
  private Integer id;
  private String name;
  private EventOrganizer organizer;
  private Location location;
  private String description;
  private LocalDate startDate;
  private LocalDate endDate;
  private LocalTime startTime;
  private LocalTime endTime;
  private Integer capacity;
  private EventTier eventTier;
  private Status status;

  private List<Pricing> pricings;
  private Set<Category> categories;
  private Merchant merchant;

  @JsonInclude(Include.NON_NULL)
  private List<ImageModel> images;

  public EventModel() {}

  public EventModel(
    Integer id,
    String name,
    EventOrganizer organizer,
    Location location,
    String description,
    LocalDate startDate,
    LocalDate endDate,
    LocalTime startTime,
    LocalTime endTime,
    Integer capacity,
    EventTier eventTier,
    Status status,
    List<Pricing> pricings,
    Set<Category> categories
  ) {
    this.id = id;
    this.name = name;
    this.organizer = organizer;
    this.location = location;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.capacity = capacity;
    this.eventTier = eventTier;
    this.status = status;
    this.pricings = pricings;
    this.categories = categories;
  }

  public EventModel(
    Integer id,
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
    List<Pricing> pricings,
    Set<Category> categories,
    Merchant merchant
  ) {
    this.id = id;
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
    this.pricings = pricings;
    this.categories = categories;
    this.merchant = merchant;
  }

  @JsonIgnoreProperties({ "createdDate", "modifiedDate", "eventMerchants" })
  public Merchant getMerchant() {
    return this.merchant;
  }

  public void setMerchants(Merchant merchant) {
    this.merchant = merchant;
  }

  public Integer getId() {
    return this.id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @JsonIgnoreProperties({ "createdDate", "modifiedDate", "user" })
  public EventOrganizer getOrganizer() {
    return this.organizer;
  }

  public void setOrganizer(EventOrganizer organizer) {
    this.organizer = organizer;
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

  @JsonIgnoreProperties({ "createdDate", "modifiedDate" })
  public List<Pricing> getPricings() {
    return this.pricings;
  }

  public void setPricings(List<Pricing> pricings) {
    this.pricings = pricings;
  }

  @JsonIgnoreProperties({ "createdDate", "modifiedDate" })
  public Set<Category> getCategories() {
    return this.categories;
  }

  public void setCategories(Set<Category> categories) {
    this.categories = categories;
  }

  public List<ImageModel> getImages() {
    return this.images;
  }

  public void setImages(List<ImageModel> images) {
    this.images = images;
  }
}
