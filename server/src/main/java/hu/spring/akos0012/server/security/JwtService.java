package hu.spring.akos0012.server.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import hu.spring.akos0012.server.config.JwtProperties;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Date;

@Service
public class JwtService {

    private final String issuer;
    private final Duration duration;
    private final Algorithm algorithm;

    public JwtService(JwtProperties props) {
        this.issuer = props.getIssuer();
        this.duration = props.getDuration();
        this.algorithm = Algorithm.HMAC256(props.getSecret());
    }

    public String createJwt(UserDetails user, Long userId, String fullName) {
        return JWT.create()
                .withSubject(user.getUsername())
                .withIssuer(issuer)
                .withExpiresAt(new Date(System.currentTimeMillis() + duration.toMillis()))
                .withClaim("userId", userId)
                .withClaim("fullName", fullName)
                .withArrayClaim("roles",
                        user.getAuthorities()
                                .stream()
                                .map(GrantedAuthority::getAuthority)
                                .toArray(String[]::new)
                )
                .sign(algorithm);
    }

    public UserDetails parseJwt(String token) {
        DecodedJWT jwt = JWT.require(algorithm)
                .withIssuer(issuer)
                .build()
                .verify(token);

        var authorities = jwt.getClaim("roles")
                .asList(String.class)
                .stream()
                .map(SimpleGrantedAuthority::new)
                .toList();

        return new User(jwt.getSubject(), "dummy", authorities);
    }
}
