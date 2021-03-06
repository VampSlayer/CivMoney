module Sinatra
  module Authentication
    def self.registered(app)

      # set authentication to check if session id is not null and user exists
      app.set(:auth) do |*roles|
        condition do
          unless !session[:id].nil? && User.exists?(:id => session[:id])
            redirect "api/unauthorized"
          end
        end
      end

      app.get "/api/unauthorized" do
        return 401
      end

      # log in the user by validating the identity token generated by the Google Sign-In button.
      # this checks that the token is signed by Google, current, and is intended for this application.
      # creates user if email does not exist
      app.post "/api/login" do
        audience = settings.client_id
        validator = GoogleIDToken::Validator.new
        begin
          payload = validator.check(params[:id_token], audience)
          puts(payload["email"])
          if User.exists?(:email => payload["email"])
            user = User.where(email: payload["email"])
            session[:id] = user.first.id
            session.options[:expire_after] = 2592000 #30days
            return 204
          else
            user = User.new()
            user.username = payload["name"]
            user.email = payload["email"]
            user.currency = "$"
            if user.save
              new_saved_user = User.where(email: payload["email"])
              session[:id] = new_saved_user.first.id
              session.options[:expire_after] = 2592000 #30days
              return 204
            else
              return 500
            end
          end
        rescue GoogleIDToken::ValidationError => e
          puts("Cannot validate: #{e}")
          return 401
        end
      end

      # logouts user & clears session
      app.post "/api/logout" do
        session.clear
        return 204
      end
    end
  end
end
