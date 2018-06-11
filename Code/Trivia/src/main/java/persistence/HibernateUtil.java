package persistence;

import org.hibernate.HibernateException;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

/**
 *  This class configures sessionFactory settings specified in the
 *  'hibernate.cfg.xml' file to adapt Hibernate behavior for an specific
 *  set of environmental variables of the DB in use.
 * 
 * @author Juan Diego Molina, Gabriel Huertas, Cesar Cardozo
 *
 */
public class HibernateUtil {
	
    //============= ATTRIBUTES ==================
	
    private static final SessionFactory sessionFactory;

    //============== METHODS ==================
    
    static {
        try {
            sessionFactory = new Configuration().configure("persistence/hibernate.cfg.xml").buildSessionFactory();
        } catch (HibernateException he) {
            throw new ExceptionInInitializerError(he);
        }
    }
    
    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public static void shutdown() {
        getSessionFactory().close();
    }
}