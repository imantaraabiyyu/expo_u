package com.team5.expoapi.models;

import com.team5.expoapi.entities.Category;
import com.team5.expoapi.entities.Location;
import com.team5.expoapi.entities.Pricing;
import com.team5.expoapi.entities.enums.EventTier;
import com.team5.expoapi.entities.enums.Status;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public class EventMerchantModel {
    private Integer id;
    private String name;
    private EventOrganizerSubmissionModel organizer;
    private Location location;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer capacity;
    private EventTier eventTier;
    private Status status;
    private Set<Pricing> pricings;
    private Set<Category> categories;
    private Set<MerchantSubmissionModel> merchants;
    private List<ImageModel> images;


    public EventMerchantModel() {
    }

    public EventMerchantModel(Integer id, String name, EventOrganizerSubmissionModel organizer, Location location, String description, LocalDate startDate, LocalDate endDate, Integer capacity, EventTier eventTier, Status status, Set<Pricing> pricings, Set<Category> categories, Set<MerchantSubmissionModel> merchants) {
        this.id = id;
        this.name = name;
        this.organizer = organizer;
        this.location = location;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.capacity = capacity;
        this.eventTier = eventTier;
        this.status = status;
        this.pricings = pricings;
        this.categories = categories;
        this.merchants = merchants;
    }


    public List<ImageModel> getImages() {
        return this.images;
    }

    public void setImages(List<ImageModel> images) {
        this.images = images;
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

    public EventOrganizerSubmissionModel getOrganizer() {
        return this.organizer;
    }

    public void setOrganizer(EventOrganizerSubmissionModel organizer) {
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

    public Set<Pricing> getPricings() {
        return this.pricings;
    }

    public void setPricings(Set<Pricing> pricings) {
        this.pricings = pricings;
    }

    public Set<Category> getCategories() {
        return this.categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public Set<MerchantSubmissionModel> getMerchants() {
        return this.merchants;
    }

    public void setMerchants(Set<MerchantSubmissionModel> merchants) {
        this.merchants = merchants;
    }  
}