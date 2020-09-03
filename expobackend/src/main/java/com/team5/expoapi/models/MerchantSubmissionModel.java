package com.team5.expoapi.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.team5.expoapi.validation.annotations.ValidPhone;
import java.util.List;
public class MerchantSubmissionModel {


    private Integer id;
    private String name;
  
    @ValidPhone
    private String phone;
  
    private String city;
    private String address;
    private String description; 
    @JsonInclude(Include.NON_NULL)
    private List<ImageModel> images;
  

    public MerchantSubmissionModel() {
    }

    public MerchantSubmissionModel(Integer id, String name, String phone, String city, String address, String description) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.city = city;
        this.address = address;
        this.description = description;
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

    public String getPhone() {
        return this.phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCity() {
        return this.city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
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