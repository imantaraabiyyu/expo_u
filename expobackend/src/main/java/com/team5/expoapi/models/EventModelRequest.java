package com.team5.expoapi.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.team5.expoapi.entities.Category;
import com.team5.expoapi.entities.Location;
import com.team5.expoapi.entities.Merchant;
import com.team5.expoapi.entities.Pricing;
import java.util.List;
import java.util.Set;

public class EventModelRequest {
  private Integer id;
  private String name;
  private Integer organizer;
  private Location location;
  private String description;
  private String startDate;
  private String endDate;
  private String startTime;
  private String endTime;
  private Integer capacity;
  private Integer eventTier;
  private Integer status;

  private Set<Pricing> pricings;
  private Set<Category> categories;
  private Merchant merchant;

  @JsonInclude(Include.NON_NULL)
  private List<ImageModel> images;

  public EventModelRequest() {}

  public EventModelRequest(
    Integer id,
    String name,
    Integer organizer,
    Location location,
    String description,
    String startDate,
    String endDate,
    String startTime,
    String endTime,
    Integer capacity,
    Integer eventTier,
    Integer status,
    Set<Pricing> pricings,
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

  public EventModelRequest(
    Integer id,
    String name,
    Location location,
    String description,
    String startDate,
    String endDate,
    String startTime,
    String endTime,
    Integer capacity,
    Integer eventTier,
    Integer status,
    Set<Pricing> pricings,
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

  @JsonIgnoreProperties({ "createdDate", "modifiedDate" })
  public Merchant getMerchant() {
    return this.merchant;
  }

  public void setMerchant(Merchant merchant) {
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

  @JsonIgnoreProperties({ "createdDate", "modifiedDate" })
  public Integer getOrganizer() {
    return this.organizer;
  }

  public void setOrganizer(Integer organizer) {
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

  public String getStartDate() {
    return this.startDate;
  }

  public void setStartDate(String startDate) {
    this.startDate = startDate;
  }

  public String getEndDate() {
    return this.endDate;
  }

  public void setEndDate(String endDate) {
    this.endDate = endDate;
  }

  public String getStartTime() {
    return this.startTime;
  }

  public void setStartTime(String startTime) {
    this.startTime = startTime;
  }

  public String getEndTime() {
    return this.endTime;
  }

  public void setEndTime(String endTime) {
    this.endTime = endTime;
  }

  public Integer getCapacity() {
    return this.capacity;
  }

  public void setCapacity(Integer capacity) {
    this.capacity = capacity;
  }

  public Integer getEventTier() {
    return this.eventTier;
  }

  public void setEventTier(Integer eventTier) {
    this.eventTier = eventTier;
  }

  public Integer getStatus() {
    return this.status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }

  @JsonIgnoreProperties({ "createdDate", "modifiedDate" })
  public Set<Pricing> getPricings() {
    return this.pricings;
  }

  public void setPricings(Set<Pricing> pricings) {
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
