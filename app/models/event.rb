class Event < ActiveRecord::Base
  has_many :check_ins
  has_many :users, :through => :check_ins
  
  geocoded_by :full_street_address
  after_validation :geocode

  def self.update_and_get_all
    self.all
  end

  private

  def full_street_address
    self.street_address + self.city + self.state
  end
end
