package com.team5.expoapi.models;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import com.team5.expoapi.validation.annotations.ValidPhone;
import java.util.List;

public class EventOrganizerSubmissionModel {
    private Integer id;
  
    @ValidPhone
    private String phone;
  
    private String name;
    private String address;
    private String city;
  
    private String description;

    @JsonInclude(Include.NON_NULL)
    private List<ImageModel> images;

    public EventOrganizerSubmissionModel() {
    }

    public EventOrganizerSubmissionModel(Integer id, String phone, String name, String address, String city, String description) {
        this.id = id;
        this.phone = phone;
        this.name = name;
        this.address = address;
        this.city = city;
        this.description = description;
    }


    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPhone() {
        return this.phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return this.city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<ImageModel> getImages() {
        return this.images;
    }

    public void setImages(List<ImageModel> images) {
        this.images = images;
    }

  
}