package com.electoral.config;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.usertype.EnhancedUserType;
import org.hibernate.usertype.ParameterizedType;
import java.io.Serializable;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.Properties;

public class SexoMesaType implements EnhancedUserType, ParameterizedType, Serializable {
    
    public static final SexoMesaType INSTANCE = new SexoMesaType();
    
    @Override
    public Object nullSafeGet(ResultSet rs, String name, SharedSessionContractImplementor session, Object owner) throws SQLException {
        String value = rs.getString(name);
        if (value == null) {
            return null;
        }
        return com.electoral.entities.Mesa.SexoMesa.valueOf(value);
    }

    @Override
    public void nullSafeSet(PreparedStatement st, Object value, int index, SharedSessionContractImplementor session) throws SQLException {
        if (value == null) {
            st.setNull(index, Types.OTHER);
        } else {
            st.setObject(index, value.toString(), Types.OTHER);
        }
    }

    @Override
    public Object deepCopy(Object value) {
        return value;
    }

    @Override
    public Serializable disassemble(Object value) {
        return (Serializable) value;
    }

    @Override
    public Object assemble(Serializable cached, Object owner) {
        return cached;
    }

    @Override
    public void setParameterValues(Properties parameters) {
    }

    @Override
    public int[] sqlTypes() {
        return new int[]{Types.OTHER};
    }

    @Override
    public Class<?> returnedClass() {
        return com.electoral.entities.Mesa.SexoMesa.class;
    }

    @Override
    public boolean equals(Object x, Object y) {
        return x == y || (x != null && x.equals(y));
    }

    @Override
    public int hashCode(Object x) {
        return x == null ? 0 : x.hashCode();
    }

    @Override
    public String toString(Object value) {
        return value == null ? "" : ((Enum<?>) value).name();
    }

    @Override
    public Object fromStringValue(String string) {
        return com.electoral.entities.Mesa.SexoMesa.valueOf(string);
    }

    @Override
    public Object fromStringValue(CharSequence charseq) {
        return com.electoral.entities.Mesa.SexoMesa.valueOf(charseq.toString());
    }
}