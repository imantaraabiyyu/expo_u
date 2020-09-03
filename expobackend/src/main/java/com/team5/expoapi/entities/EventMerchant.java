package com.team5.expoapi.entities;

import com.team5.expoapi.models.ImageModel;
import java.io.Serializable;
import java.util.List;
import javax.persistence.AssociationOverride;
import javax.persistence.AssociationOverrides;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "event_merchant")
@AssociationOverrides(
  {
    @AssociationOverride(
      name = "pk.event",
      joinColumns = @JoinColumn(name = "EVENT_ID")
    ),
    @AssociationOverride(
      name = "pk.merchant",
      joinColumns = @JoinColumn(name = "MERCHANT_ID")
    )
  }
)
public class EventMerchant implements Serializable {
  private static final long serialVersionUID = 1L;

  @EmbeddedId
  private EventMerchantId pk = new EventMerchantId();

  private Integer status;

  public EventMerchant() {}

  public EventMerchantId getPk() {
    return this.pk;
  }

  public void setPk(EventMerchantId pk) {
    this.pk = pk;
  }

  @Transient
  public Event getEvent() {
    return getPk().getEvent();
  }

  public void setEvent(Event event) {
    getPk().setEvent(event);
  }

  @Transient
  public Merchant getMerchant() {
    return getPk().getMerchant();
  }

  public void setMerchant(Merchant merchant) {
    getPk().setMerchant(merchant);
  }

  public Integer getStatus() {
    return this.status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }
}
