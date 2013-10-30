class User < ActiveRecord::Base
  has_many :check_ins
  has_many :events, :through => :check_ins
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  devise :omniauthable, :omniauth_providers => [:twitter]


  def self.find_for_twitter_oauth(auth, signed_in_resource=nil)
    user = User.where(:provider => auth.provider, :uid => auth.uid).first
    unless user
      user = User.create(name:auth.extra.raw_info.name,
                           provider:auth.provider,
                           uid:auth.uid,
                           avatar: auth[:info][:image],
                           twitter_handle: auth[:extra][:raw_info][:screen_name],
                           email:"#{auth.uid}@twitter.com",
                           password:Devise.friendly_token[0,20]
                           )
    end

    # Update changes user made on twitter profile
    if did_user_update_info(user, auth)
      user.twitter_handle = auth[:extra][:raw_info][:screen_name]
      user.save
    end

    user
  end

############## PRIVATE #####################
  private

  def self.did_user_update_info(user, auth)
    user.twitter_handle != auth[:extra][:raw_info][:screen_name]
  end

end
