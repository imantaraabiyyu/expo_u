package com.team5.expoapi.entities;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;

@Embeddable
public class EventMerchantId implements Serializable{

    private static final long serialVersionUID = 1L;
    @ManyToOne(cascade = CascadeType.ALL)
    private Event event;
    @ManyToOne(cascade = CascadeType.ALL)
    private Merchant merchant;


    public Event getEvent() {
        return this.event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public Merchant getMerchant() {
        return this.merchant;
    }

    public void setMerchant(Merchant merchant) {
        this.merchant = merchant;
    }

}